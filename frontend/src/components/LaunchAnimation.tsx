/* Credit to Oleksandr Sabov - https://codepen.io/sabov/pen/vvwLNW */
import "./LaunchAnimation.css";

const LaunchAnimation = () => {
  return (
    <div className='frame'>
      <div className='scene'>
        <div className='scene__main'>
          <div className='rocket'>
            <div className='rocket__body'></div>
            <div className='rocket__fin rocket__fin--left'></div>
            <div className='rocket__fin rocket__fin--right'></div>
            <div className='rocket__fin rocket__fin--center'></div>
            <div className='rocket__stream'></div>
          </div>
        </div>
        <div className='shadow'></div>
        <div className='surface'></div>
        <div className='launch-pad'></div>
        <div className='countdown'></div>

        <div className='smoke'>
          <div className='smoke__bubble'></div>
          <div className='smoke__bubble'></div>
          <div className='smoke__bubble'></div>
          <div className='smoke__bubble'></div>
          <div className='smoke__bubble'></div>
          <div className='smoke__bubble'></div>
          <div className='smoke__bubble'></div>
          <div className='smoke__bubble'></div>
          <div className='smoke__bubble'></div>
          <div className='smoke__bubble'></div>
          <div className='smoke__bubble'></div>
          <div className='smoke__bubble'></div>
          <div className='smoke__bubble'></div>
          <div className='smoke__bubble'></div>
          <div className='smoke__bubble'></div>
        </div>
      </div>
    </div>
  );
};

export default LaunchAnimation;
