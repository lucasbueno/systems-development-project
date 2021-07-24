import * as React from 'react';
import {Button, ScrollView, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import {Text, View} from '../components/Themed';
import * as SQLite from "expo-sqlite";

function openDatabase() {
    const db = SQLite.openDatabase("f.db");
    return db;
}

const db = openDatabase();

const getUserName = () => {
    const [username, setUsername] = React.useState(null);

    db.transaction((tx) => {
        tx.executeSql(
            "SELECT Username, Email, Password from Users",
            [],
            (tx, results) => {
                let len = results.rows.length;
                if (len > 0) {
                    setUsername(results.rows.item(0).Username);
                }
            }
        );
    });
    return username;
}

function eventClicked(event: string) {
    alert("O evento " + event + " foi selecionado.");
}

export default function HomeScreen() {
    db.transaction((tx) => {
        tx.executeSql(
            "create table if not exists Users (Username TEXT, Email TEXT, Password TEXT);"
        );
    });

    var hasUser = false;
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT Username from Users",
            [],
            (tx, results) => {
                var len = results.rows.length;
                if (len > 0) {
                    hasUser = true;
                }
            }
        );
    });

    if(hasUser == false){
        db.transaction((tx) => {
            tx.executeSql("insert into Users (Username, Email, Password) values (?, ?, ?);", ['admin', 'admin@admin.com', 'admin']);
        });
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Olá {getUserName()}</Text>
                <Text style={styles.title}>Estes são os eventos disponíveis:</Text>
            </View>
            <ScrollView style={{alignSelf: 'stretch', marginHorizontal:10}}>
                <Button title="Evento 1" color={Colors.light.tint}
                        onPress={() => {
                            alert('Você clicou no Evento 1!');
                        }}
                />
                <View style={styles.separator} />
                <Button title="Evento 2" color={Colors.light.tint} onPress={() => eventClicked("Evento 2")}/>
                <View style={styles.separator} />
                <Button title="Evento 3" color={Colors.light.tint} onPress={() => eventClicked("Evento 3")}/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        marginLeft: 10,
    },
    separator: {
        marginVertical: 5,
        height: 1
    },
});
