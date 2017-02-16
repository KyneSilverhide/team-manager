import React from 'react';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

const handleChange = (value) => {
    this.setState({
      value: value
    });
}

const Index = () => (
  <div>
    <Slider
          min={0}
          max={100}
          value={50}
          onChange={handleChange}
        />
    </div>
);

export default Index;
