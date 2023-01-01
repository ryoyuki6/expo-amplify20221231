import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { API, Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';

import { listPeople } from './src/graphql/queries';

import awsExports from './src/aws-exports';
Amplify.configure(awsExports);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

function TopPage() {
  const [data1,setData1] = useState([]);

  useEffect(() => {
    fetchData1();
  }, []);

  async function fetchData1() {
    const apiData = await API.graphql({ query: listPeople});
    setData1(apiData.data.listPeople.items);
  }

  console.log(data1);

  return (
    <View style={styles.container}>
      <Text>Hello World !!!</Text>
      <SignOutButton />
    </View>
  );
}

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <TopPage />
      </Authenticator>
    </Authenticator.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
