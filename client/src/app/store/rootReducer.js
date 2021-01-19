import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import fuse from './fuse';
import i18n from './i18nSlice';
import userProfileReducer from '../../store/reducers/userProfile';
import courtReducer from '../../store/reducers/courts';
import paymentReducer from '../../store/reducers/payment';

const createReducer = asyncReducers =>
	combineReducers({
		auth,
		fuse,
		i18n,
		userProfileReducer,
		courtReducer,
		paymentReducer,
		...asyncReducers
	});

export default createReducer;
