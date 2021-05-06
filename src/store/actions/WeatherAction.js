import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import API from '../../../api';

export const UPDATE_WEATHER_DATA = 'UPDATE_WEATHER_DATA';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const SET_IS_LOADING = 'SET_IS_LOADING';

export const updateWeatherData = (data) => {
    return {
        type : UPDATE_WEATHER_DATA,
        data,
    };
}

export const setErrorMessage = (errorMessage) => {
    return {
        type : SET_ERROR_MESSAGE,
        errorMessage,
    };
}

export const setIsLoading = (isLoading) => {
    return {
        type : SET_IS_LOADING,
        isLoading,
    };
}

export const searchByZipcode = (zipCode) => {
    return  async (dispatch) => {
        const { url, appid } = API;
        dispatch(setIsLoading(true));
        try{
            const response = await Axios.get(`${url}?zip=${zipCode},in&appid=${appid}`)
            dispatch(setErrorMessage(''));
            dispatch(setIsLoading(false));
            dispatch(updateWeatherData(response.data));
            saveDataInLocalStorage(zipCode, response.data);
        } catch(error) {
            console.log(`Error In API Response ${error}`)
            dispatch(updateWeatherData({}));
            dispatch(setErrorMessage(`could not fetch weather data for ${zipCode}`))
        }
    };
}

export const getDataFromLocalStorage = (zipCode) => {
    return async (dispatch) => {
        const data = await AsyncStorage.getItem(zipCode);
        if(!data){ 
            dispatch(updateWeatherData({}));
            dispatch(setErrorMessage(`Could not fetch weather for ${zipCode} , check network connection`));
        } else {
            dispatch(setErrorMessage(''));
            dispatch(setIsLoading(false));
            dispatch(updateWeatherData(JSON.parse(data)));
        }
    }
}

export const saveDataInLocalStorage = async (zipCode, weatherData) => {
    try{
        await AsyncStorage.setItem(zipCode, JSON.stringify(weatherData));
    } catch(error) {
        console.log(`Error${error}`)
    }
}