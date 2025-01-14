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
class ExpenseTracker:
    """Track and store expense data for model training"""
    
    def __init__(self, database_connection=None):
        self.expenses = []
        self.db = database_connection
    
    def add_expense(self, expense_data: Dict, split_data: Dict):
        """Add new expense with its split data"""
        expense_record = {
            **expense_data,
            'split_data': split_data,
            'recorded_at': datetime.datetime.now()
        }
        
        if self.db:
            # Save to database
            self._save_to_db(expense_record)
        else:
            # Store in memory
            self.expenses.append(expense_record)
    
    def get_training_data(self, start_date=None, end_date=None) -> List[Dict]:
        """Retrieve expense data for model training"""
        if self.db:
            return self._get_from_db(start_date, end_date)
        return self.expenses
    
    def _save_to_db(self, expense_record: Dict):
        """Save expense record to database"""
        # Implement database saving logic
        pass
    
    def _get_from_db(self, start_date, end_date) -> List[Dict]:
        """Retrieve expense records from database"""
        # Implement database retrieval logic
        return []

# Usage example
def initialize_smart_split_system():
    """Initialize and configure the smart split system"""
    splitter = SmartBillSplitter()
    tracker = ExpenseTracker()
    
    # Sample user preferences
    user_preferences = {
        'user1': {
            'category_weights': {'restaurant': 1.2, 'groceries': 0.8},
            'location_preferences': ['downtown'],
            'split_preferences': {'default': 'equal'},
            'excluded_categories': ['personal']
        }
    }
    
    # Add user preferences
    for user_id, prefs in user_preferences.items():
        splitter.preference_manager.add_user_preference(user_id, prefs)
    
    return splitter, tracker