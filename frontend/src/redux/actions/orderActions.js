export const payment = (items, restaurant) => async(dispatch) =>{
    try{

        console.log("1. Payment function started");
        console.log("Items:", items);

        dispatch(paymentRequest());

        const {data} = await api.post(
            "/v1/payment/process",
            {items, restaurant},
            {
                headers:{
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("2. Backend response:", data);

        if(data.url){
            console.log("3. Stripe URL:", data.url);
            window.location.assign(data.url);
        }

        dispatch(paymentSuccess());

    }catch(error)
    {
        console.log("4. Payment error:", error);
        dispatch(paymentFail(error.response?.data?.message));
    }
}