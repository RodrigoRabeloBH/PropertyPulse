'use client'

import { useEffect, useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from "react-map-gl";
import { setDefaults, fromAddress } from "react-geocode";
import Spinner from "./Spinner";
import Image from "next/image";
import pin from '@/assets/images/pin.svg';


export default function PropertyMap({ property }) {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewPort, setVuewPort] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 12,
        width: '100%',
        height: '500px'
    });

    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
        language: 'en',
        region: 'us'
    });

    useEffect(() => {
        fromAddress(`${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`)
            .then(res => {
                const { lat, lng } = res.results[0].geometry.location;
                setLat(lat);
                setLng(lng);
                setVuewPort({
                    ...viewPort,
                    latitude: lat,
                    longitude: lng
                })
            }).catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (<Spinner loading={loading} />);

    return !loading && (
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            mapLib={import('mapbox-gl')}
            initialViewState={{
                longitude: lng,
                latitude: lat,
                zoom: 15
            }}
            style={{ width: '100%', height: 500 }}
            mapStyle='mapbox://styles/mapbox/streets-v9'
        >
            <Marker longitude={lng} latitude={lat} anchor='bottom'>
                <Image src={pin} alt='location' width={40} height={40}/>
            </Marker>
        </Map>
    )
}
