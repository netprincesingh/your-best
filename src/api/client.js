
import axios from 'axios';

// For iOS Simulator, 'localhost' works.
// For Android Emulator, use '10.0.2.2' to connect to your host machine's localhost.
//the lical host Ip of my computer is
//const baseURL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
const baseURL = ' https://accepted-camel-certainly.ngrok-free.app';
export default axios.create({
  baseURL: baseURL,
});