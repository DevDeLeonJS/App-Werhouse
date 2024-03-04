import AuthContex from "./src/auth/AuthContex";
import { NativeRouter } from "react-router-native";
import RoutesApp from "./src/routes/Routes";
import ApolloClients from "./src/services/ApolloClients";



const App = () => {  
  return (
      <AuthContex>
          <ApolloClients>
              <NativeRouter>
                  <RoutesApp />          
              </NativeRouter>
          </ApolloClients>
      </AuthContex>
  )
}
export default App;
