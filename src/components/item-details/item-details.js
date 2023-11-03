import React, { useState, useEffect } from "react";
import ErrorButton from "../error-button/error-button";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator/error-idicator";
import "./item-details.scss";

const Record = ({item, field, label}) => {
    return (
        <li>
            <span>{`${label} ${item[field]}`}</span>
        </li>
    );
};

export {
    Record
};

const ItemDetails = (props) => {
    const[state, setState] = useState({
        item: null,
        image: null,
        loading: false,
        error: false
    });

    useEffect(() => {
        updateItem();
    },[props, props.getData, props.getImageUrl]);    

    const onItemLoaded = (item) => {
        setState({
            item,
            image: props.getImageUrl(item),
            loading: false
        });
    };

    const updateItem = () => {
        const {itemId, getData} = props;
        if(!itemId) {
            return;
        }
        setState({
            loading: true
        });
        getData(itemId)
            .then(onItemLoaded);        
    }

    try {
        const {item, image, loading} = state;

        const noData = !(item || loading)
        
        if(noData) {
            return (
                <div className="item-details">
                    <h4>Select an Item</h4>
                </div>
            );
        }
    
        if(state.loading) {
            return (
                <div className="item-details">
                    <Spinner/>
                </div>
            );
        }
    
        const {name} = item;
    
        return(
            <div className="item-details">
                <div className="image-container">
                    <img src={image} alt=""/>
                </div>
                <div>
                    <h4>{name}</h4>
                    <ul>
                        {
                            React.Children.map(props.children, (child) => {
                                return React.cloneElement(child, {item});
                            })
                        }
                    </ul>
                    <ErrorButton />
                </div>
            </div>
        );
    }
    catch(err) {
        setState({
            loading: false,
            error: true
        });
    }

    finally {
        if(state.error) {
            return (
                <div className="item-details">
                    <ErrorIndicator/>
                </div>
            )
        }
    }
};

export default ItemDetails;