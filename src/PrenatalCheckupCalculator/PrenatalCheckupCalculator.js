import React, { useState } from 'react';
import moment from 'moment';
import "./PrenatalCheckupCalculator.css"
import ilustrace from "../assets/ilustrace1.png"

const PrenatalCheckupCalculator = () => {
  const [examDate, setExamDate] = useState('');
  const [pregnancySize, setPregnancySize] = useState('');
  const [nextCheckupDate, setNextCheckupDate] = useState('');
  const [secondCheckupDate, setSecondCheckupDate] = useState('');
  

  const handleExamDateChange = (event) => {
    setExamDate(event.target.value);
  };

  const handlePregnancySizeChange = (event) => {
    setPregnancySize(event.target.value);
  };

  const calculateNextCheckupDates = () => {
    const [weeks, days] = pregnancySize.split('+').map((str) => parseInt(str.trim()));

    if (!isNaN(weeks) && !isNaN(days) && examDate) {
      const examDateObj = moment(examDate);

      // Calculate the difference between pregnancySize and the desired intervals (8+5, 10+2)
      const [desiredWeeksFirst, desiredDaysFirst] = [8, 5]; // Desired interval 8+5
      const [desiredWeeksSecond, desiredDaysSecond] = [10, 2]; // Desired interval 10+2
      const diffWeeksFirst = desiredWeeksFirst - weeks;
      const diffDaysFirst = desiredDaysFirst - days;
      const diffWeeksSecond = desiredWeeksSecond - weeks;
      const diffDaysSecond = desiredDaysSecond - days;

      // Calculate the total differences in days for both checkup dates
      const totalDiffDaysFirst = diffWeeksFirst * 7 + diffDaysFirst;
      const totalDiffDaysSecond = diffWeeksSecond * 7 + diffDaysSecond;

      // Calculate the next checkup dates by adding the total differences in days to the exam date
      const nextCheckupDateObj = examDateObj.clone().add(totalDiffDaysFirst, 'days');
      const secondCheckupDateObj = examDateObj.clone().add(totalDiffDaysSecond, 'days');

      setNextCheckupDate(nextCheckupDateObj.format('DD-MM-YYYY'));
      setSecondCheckupDate(secondCheckupDateObj.format('DD-MM-YYYY'));

      // Check if both checkup dates are within their desired ranges (8+5 to 10+2 weeks)
      const startDate = examDateObj.clone().add(desiredWeeksFirst * 7 + desiredDaysFirst, 'days');
      const endDate = examDateObj.clone().add(desiredWeeksSecond * 7 + desiredDaysSecond, 'days');
      
    }
  };

  return (
    <div>
      <h2>Vypočet odběru a přeměření plodu v 1. trimestru těhotenství</h2>
      <img className='ilustrace1' src={ilustrace}/>
      <form>
        <div className='first_input_box'>
          <label className='first_input_label' htmlFor="examDate">Datum vyšetření:</label>
          <input
            type="date"
            id="examDate"
            value={examDate}
            onChange={handleExamDateChange}
            placeholder='01.01.2022'
          />
        </div>
        <div className='second_input_box'>
          <label className='second_input_label' htmlFor="pregnancySize">Stáří plodu změřeného UZ (týden + den):</label>
          <input
            type="text"
            id="pregnancySize"
            value={pregnancySize}
            placeholder='např. 5+4'
            onChange={handlePregnancySizeChange}
          />
        </div>
        <div className='buttons'>
          <button className='button_check' type="button" onClick={calculateNextCheckupDates}>
            Vypočti datum další kontroly
          </button>
        </div>
      </form>
      <div className='result_sentence'>
        {nextCheckupDate && (
          <p>
            Těhotenský odběr a změření plodu lze v termínu od <strong>{nextCheckupDate}</strong> do <strong>{secondCheckupDate}</strong>
          </p>
        )}
        
        
    
      </div>
    </div>
  );
};

export default PrenatalCheckupCalculator;