import http from 'k6/http';
import { sleep, check } from 'k6'

export const options = {
    //vus means virtual users
    stages: [
        {duration: '5m', target: 200}, //ramp up
        {duration: '20m', target: 200}, //stable
        {duration: '5m', target: 0} //ramp down to 0 users
    ], 
    cloud: {
        // Project: Default project
        projectID: 3707020,
        // Test runs with the same name groups test runs together.
        name: 'Test (29/07/2024-13:38:44)'
      }
    // threshold: {
    //     http_req_duration: ['p(99)<100'], //99% of request must be completed
    // }
}

export default () => {
    http.get('https://magento.softwaretestingboard.com/');
    // check(res, {'200': (r) => r.status === 200});
    sleep(1);
}