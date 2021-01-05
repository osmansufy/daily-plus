import { useEffect } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const InputPhone = (props) => { 

    return ( <PhoneInput
        country={'bd'}
        prefix='+'
        // onlyCountries={['bd']}
        containerClass={props.containerClass}
        value={props.value}
        onChange={props.change}
        isValid={props.valid(props.value)}
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true,
              
              }
        }
        />
     );
}
 
export default InputPhone;