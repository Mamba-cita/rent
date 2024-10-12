import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Tenants from "./components/Tenants";





const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
});



function App() {
  return (
    <>
    <ApolloProvider client={client}>
    <Header />
    <div className="Container">
      <Tenants />     
    </div>
    </ApolloProvider>
  
    </>
  );
}

export default App;
