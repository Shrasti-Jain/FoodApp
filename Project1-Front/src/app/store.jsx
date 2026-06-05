import  {configureStore} from '@reduxjs/toolkit'
import errorReducer from '../reducers/ErrorSlice' 
import userReducer from '../reducers/userSlice'
import partnerSlice from '../reducers/partnerSlice'

export let store=configureStore({
    reducer:{       
       user:userReducer,
       partner:partnerSlice,
       error:errorReducer
    }
})

