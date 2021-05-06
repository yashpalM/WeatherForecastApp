import React, { useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as weatherActions from '../store/actions/WeatherAction';
import { useDispatch, useSelector } from 'react-redux';
import NetworkInfo from '../utils/NetworkInfo';
import Weather from '../component/Weather';


const WeatherView = props => {
    const { route, navigation } = props;
    const { data, errorMessage, isLoading } = useSelector(state => state.weather);
    const dispatch = useDispatch();
    const { zipcode } = route.params;
    useEffect(() => {
        fetchData()
    }, [dispatch]);


    const fetchData = useCallback(async () => {
        const isConnected = await NetworkInfo.isNetworkAvailable();
        if (isConnected == null) {
            dispatch(weatherActions.searchByZipcode(zipcode));
        } else {
        dispatch(
            isConnected
            ? weatherActions.searchByZipcode(zipcode)
            : weatherActions.getDataFromLocalStorage(zipcode),
        );
        }
        }, [dispatch]);

    return (
        <View>
            <Weather
                data={data}
                errorMessage={errorMessage}
                isLoading={isLoading}
            />
        </View>
    );


};

export default WeatherView;