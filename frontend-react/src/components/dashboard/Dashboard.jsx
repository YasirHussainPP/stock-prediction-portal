import axios from 'axios';
import React,{use, useEffect} from 'react'
import axiosInstance from '../../axiosInstance';

const Dashboard = () => {
    
    useEffect(() => {
       const fetchProtectedData = async () => {
       //  const accessToken = localStorage.getItem('accessToken');
       try{
           const response = await axiosInstance.get('/protected-view')
           console.log('Protected data:', response.data);

       }
         catch (error) {
              console.error('Error fetching protected data:', error);

         }
         finally{

         }  


      }
    fetchProtectedData();
    }, []);
  return (
    <div>
      <div className="container">
        <h1 className='text-light'> Dashbaord</h1>
      </div>
    </div>
  )
}

export default Dashboard
