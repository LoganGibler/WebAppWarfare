import React, { useState, useEffect } from "react";


const Cart = () => {
    // get params for id, then do a fetch request to get the blog with that id
    // render the whole blog below, title, author, date created, description, picture, steps
    let { id } = useParams();
    // api call sending id, getting back blog
    return(
        <div>
            <h1>Cart</h1>
        </div>
    )
}

export default Cart