
const FitnessShop = () => {
    return (
        <div className="mt-sec mb-sec">
            <h1 className='title-sec'>Fitness Shop</h1>
            <div style={fitnessShop_card_container}>

                <div>
                    <img className='max-w-[175px] rounded-xl' src="https://i.ibb.co/9t6pqqW/87337-d10aa-Ab-zone-flex-510-X-612-1.jpg" alt="" />
                    <p className='mt-4 mb-1 text-center'>Gym Equipment</p>
                    <p className='text-center'>Price: $15</p>
                </div>
                <div>
                    <img className='max-w-[175px] rounded-xl' src="https://i.ibb.co/9cCVtV2/ADX-rear-right-3-4-960-300x300.png" alt="" />
                    <p className='mt-4 mb-1 text-center'>Gym Equipment</p>
                    <p className='text-center'>Price: $25</p>
                </div>
                <div>
                    <img className='max-w-[175px] rounded-xl' src="https://i.ibb.co/Nmc0BTj/images.jpg" alt="" />
                    <p className='mt-4 mb-1 text-center'>Gym Equipment</p>
                    <p className='text-center'>Price: $55</p>
                </div>
                <div>
                    <img className='max-w-[175px] rounded-xl' src="https://i.ibb.co/FnRXcb2/istockphoto-1391410249-612x612.jpg" alt="" />
                    <p className='mt-4 mb-1 text-center'>Gym Equipment</p>
                    <p className='text-center'>Price: $28</p>
                </div>
            </div>
        </div>

    );
};

const fitnessShop_card_container={
    display: "flex",
    gap: "60px",
    justifyContent: "center",
    paddingTop: "20px",
    flexWrap: "wrap",
}

export default FitnessShop;








