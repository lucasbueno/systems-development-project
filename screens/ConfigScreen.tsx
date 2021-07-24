import * as React from 'react';
import {TextInput, ScrollView, StyleSheet, Button} from 'react-native';
import {Text, View} from '../components/Themed';
import Colors from "../constants/Colors";

import * as SQLite from "expo-sqlite";

function openDatabase() {
    const db = SQLite.openDatabase("f.db");
    return db;
}

const db = openDatabase();

export default function ConfigScreen() {

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    React.useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT Username, Email, Password from Users",
                [],
                (tx, results) => {
                    let len = results.rows.length;
                    if (len > 0) {
                        setUsername(results.rows.item(0).Username);
                        setEmail(results.rows.item(0).Email);
                        setPassword(results.rows.item(0).Password);
                    }
                }
            );
        });
    }, []);

  return (
      <ScrollView style={{alignSelf: 'stretch', marginHorizontal: 10, marginVertical: 10}}>
        <Text style={styles.title}>Seu perfil:</Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={styles.title}>Usuário:</Text>
          <TextInput style={styles.textInput} onChangeText={setUsername}>{username}</TextInput>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={styles.title}>E-mail:</Text>
          <TextInput style={styles.textInput} onChangeText={setEmail}>{email}</TextInput>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={styles.title}>Senha:</Text>
          <TextInput style={styles.textInput} secureTextEntry={true} onChangeText={setPassword}>{password}</TextInput>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={styles.title}>Confirmação de senha:</Text>
            <TextInput style={styles.textInput} secureTextEntry={true}>{password}</TextInput>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View style={{flex: 1}}>
            <Button title="Salvar" color={Colors.light.tint} onPress={
                () => db.transaction((tx) =>
                {
                    tx.executeSql(`update Users set Username = ?, Email = ?, Password = ?;`,
                        [username, email, password]);
                }, error => alert("Erro ao salvar o usuário!"),() => alert("Usuário salvo!"))
            }/>
          </View>
          <View style={{flex: 1}}>
            <Button title="Excluir" color='red' onPress={() => db.transaction((tx) => {
                tx.executeSql(`delete from Users;`);
                setUsername('');
                setEmail('');
                setPassword('');
            }, error => alert("Erro ao excluir o usuário!"),() => alert("Usuário excluído!"))}/>
          </View>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
    flex: 1,
  },
  textInput: {
    backgroundColor: 'white',
    flex: 3,
  },
  separator: {
    marginVertical: 5,
    height: 1
  },
});
