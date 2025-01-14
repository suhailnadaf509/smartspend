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
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
class UserPreferenceManager:
    """Manage and apply user preferences for splitting"""
    
    def __init__(self):
        self.user_preferences = {}
        
    def add_user_preference(self, user_id: str, preferences: Dict):
        """Add or update user preferences"""
        self.user_preferences[user_id] = {
            'category_weights': preferences.get('category_weights', {}),
            'location_preferences': preferences.get('location_preferences', []),
            'split_preferences': preferences.get('split_preferences', {}),
            'default_split_method': preferences.get('default_split_method', 'equal'),
            'excluded_categories': preferences.get('excluded_categories', [])
        }
    
    def get_split_adjustment(self, user_id: str, expense_metadata: ExpenseMetadata) -> float:
        """Calculate split adjustment factor based on user preferences"""
        if user_id not in self.user_preferences:
            return 1.0
            
        adjustment = 1.0
        prefs = self.user_preferences[user_id]
        
        # Adjust based on category
        category_weight = prefs['category_weights'].get(expense_metadata.category, 1.0)
        adjustment *= category_weight
        
        # Adjust based on location preference
        if expense_metadata.location in prefs['location_preferences']:
            adjustment *= 1.2
            
        return adjustment
