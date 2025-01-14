import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from typing import List, Dict
import datetime
from dataclasses import dataclass
import logging


class SmartBillSplitter:
    """Enhanced smart bill splitting system with ML capabilities"""
    
    def __init__(self):
        self.feature_extractor = FeatureExtractor()
        self.preference_manager = UserPreferenceManager()
        self.setup_ml_pipeline()
        
    def setup_ml_pipeline(self):
        """Set up the ML pipeline with preprocessing and model"""
        categorical_transformer = Pipeline([
            ('onehot', OneHotEncoder(handle_unknown='ignore'))
        ])
        
        numerical_transformer = Pipeline([
            ('scaler', StandardScaler())
        ])
        
        self.preprocessor = ColumnTransformer(
            transformers=[
                ('num', numerical_transformer, self.feature_extractor.numerical_features),
                ('cat', categorical_transformer, self.feature_extractor.categorical_features)
            ])
        
        self.pipeline = Pipeline([
            ('preprocessor', self.preprocessor),
            ('classifier', RandomForestRegressor(
                n_estimators=100,
                max_depth=10,
                random_state=42
            ))
        ])
        
    def train_model(self, historical_data: List[Dict]):
        """Train the ML model using historical expense data"""
        logger.info("Starting model training with %d samples", len(historical_data))
        
        try:
            # Convert historical data to DataFrame
            df = pd.DataFrame(historical_data)
            
            # Extract features
            X = self._prepare_features(df)
            y = df['actual_splits'].values
            
            # Train the model
            self.pipeline.fit(X, y)
            logger.info("Model training completed successfully")
            
        except Exception as e:
            logger.error("Error during model training: %s", str(e))
            raise
    
    def suggest_split(self, expense_data: Dict, group_data: Dict) -> Dict:
        """Generate smart split suggestions for an expense"""
        logger.info("Generating split suggestions for expense: %s", expense_data)
        
        try:
            # Create expense metadata
            metadata = ExpenseMetadata(
                category=expense_data['category'],
                location=expense_data['location'],
                timestamp=pd.to_datetime(expense_data['timestamp']),
                participants=group_data['members']
            )
            
            # Get base splits
            base_splits = self._calculate_base_splits(expense_data, metadata)
            
            # Apply ML adjustments
            ml_adjusted_splits = self._apply_ml_adjustments(base_splits, expense_data, metadata)
            
            # Apply user preferences
            final_splits = self._apply_preference_adjustments(ml_adjusted_splits, metadata)
            
            # Generate explanation
            explanation = self._generate_explanation(final_splits, metadata)
            
            return {
                'suggested_splits': final_splits,
                'explanation': explanation,
                'confidence_score': self._calculate_confidence_score(final_splits)
            }
            
        except Exception as e:
            logger.error("Error generating split suggestions: %s", str(e))
            raise
    
    def _calculate_base_splits(self, expense_data: Dict, metadata: ExpenseMetadata) -> Dict[str, float]:
        """Calculate initial base splits before adjustments"""
        total_amount = expense_data['amount']
        num_participants = len(metadata.participants)
        
        if metadata.split_method == 'equal':
            base_split = total_amount / num_participants
            return {participant: base_split for participant in metadata.participants}
        
        # Implement other split methods as needed
        return {}
    
    def _apply_ml_adjustments(self, base_splits: Dict[str, float], 
                            expense_data: Dict, metadata: ExpenseMetadata) -> Dict[str, float]:
        """Apply ML-based adjustments to base splits"""
        features = self._prepare_features(pd.DataFrame([expense_data]))
        adjustment_factors = self.pipeline.predict(features)[0]
        
        adjusted_splits = {}
        total_adjustment = sum(adjustment_factors)
        
        for participant, base_split in base_splits.items():
            participant_idx = metadata.participants.index(participant)
            adjustment = adjustment_factors[participant_idx] / total_adjustment
            adjusted_splits[participant] = base_split * adjustment
            
        return adjusted_splits
    
    def _apply_preference_adjustments(self, splits: Dict[str, float], 
                                    metadata: ExpenseMetadata) -> Dict[str, float]:
        """Apply user preference-based adjustments"""
        adjusted_splits = {}
        total_amount = sum(splits.values())
        
        # Apply individual preference adjustments
        for participant, amount in splits.items():
            adjustment = self.preference_manager.get_split_adjustment(
                participant, metadata
            )
            adjusted_splits[participant] = amount * adjustment
        
        # Normalize splits to match total amount
        normalization_factor = total_amount / sum(adjusted_splits.values())
        return {k: v * normalization_factor for k, v in adjusted_splits.items()}
    
    def _prepare_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Prepare features for ML model"""
        # Extract temporal features
        temporal_features = df['timestamp'].apply(
            self.feature_extractor.extract_temporal_features
        ).apply(pd.Series)
        
        # Combine all features
        features = pd.concat([
            df[['amount', 'category', 'location']],
            temporal_features
        ], axis=1)
        
        return features
    
    def _generate_explanation(self, splits: Dict[str, float], 
                            metadata: ExpenseMetadata) -> str:
        """Generate detailed explanation for the split"""
        factors = [
            f"Category: {metadata.category}",
            f"Location: {metadata.location}",
            f"Time: {metadata.timestamp.strftime('%I:%M %p')}",
            f"Day: {metadata.timestamp.strftime('%A')}"
        ]
        
        explanation = (
            f"Split suggestions based on: {', '.join(factors)}. "
            f"Adjustments made for user preferences and historical patterns. "
            f"Total participants: {len(metadata.participants)}"
        )
        
        return explanation
    
    def _calculate_confidence_score(self, splits: Dict[str, float]) -> float:
        """Calculate confidence score for the suggested splits"""
        # Implement confidence scoring logic
        return 0.85  # Placeholder
