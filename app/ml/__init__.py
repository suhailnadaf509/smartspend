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
class ExpenseMetadata:
    """Data class for storing expense metadata"""
    category: str
    location: str
    timestamp: datetime.datetime
    participants: List[str]
    tags: List[str] = None
    recurring: bool = False
    split_method: str = "equal"  # equal, percentage, custom