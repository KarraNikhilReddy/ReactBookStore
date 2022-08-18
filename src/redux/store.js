import {createStore, applyMiddleware} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'




const persistConfig = {
    key: 'persistedBookStore',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = createStore(persistedReducer, composeWithDevTools( applyMiddleware(thunk) ) )



const Persistor = persistStore(store)


export {Persistor}
export default store


/* const store = createStore(rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )

export default store */