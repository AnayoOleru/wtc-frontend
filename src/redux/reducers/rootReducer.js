import { combineReducers } from 'redux';
import * as reducers from './reducers';
import { locationsReducer } from './locationsReducer'
import { singleLocationReducer } from './singleLocationReducer'
import { mapsReducer } from './mapsReducer'
import { activeLocationReducer } from './activeLocationReducer'

const rootReducer = combineReducers({
  locations: locationsReducer,
  newLocation: reducers.addLocationReducer,
  maps: mapsReducer,
  location: singleLocationReducer,
  activeLocation: activeLocationReducer,
  auth: reducers.authReducer,
  verifyEmail: reducers.verifyEmailReducer,
  resetPassword: reducers.resetPasswordReducer,
  addReview: reducers.addReviewReducer
});

export default rootReducer;
