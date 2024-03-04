import { useState } from "react";
import { AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai'
import {MdOutlineLocalMovies} from 'react-icons/md'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UseSelector, useDispatch } from "react-redux";
import {useLoginMutation} from '../../redux/api/users'
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  return ( 
    <div>Navigation</div>
   );
}
 
export default Navigation;