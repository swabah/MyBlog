import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'

const appReducers = combineReducers({
    dataInfo,
})

function dataInfo(state = {
    data:[],
    error : '',
    loading : false
    },action) {
        switch (action.type) {
            case 'set-data':
                return{
                    ...state,
                    data:action.payload
                }
            case 'loading':
                return{
                    ...state,
                    loading:action.payload
                }
            case 'error':
                return{
                    ...state,
                    error:action.payload
                }
            default:
                break;
        }
}

function setData(data) {
    return{
        type:'set-data',
        payload:data
    }
}
function setLoading(isLoading) {
    return{
        type:'loading',
        payload:isLoading
    }
}
function setError(error) {
    return{
        type:'set-data',
        payload:error
    }
}

const store = createStore(appReducers , applyMiddleware(thunk))

export default store

export {
    setData,
    setLoading,
    setError
}