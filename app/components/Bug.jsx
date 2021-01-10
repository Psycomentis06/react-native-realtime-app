import React, {useState} from 'react';
import {View, Text, StyleSheet, Linking, Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {COLORS} from './__styleVars';

export default function Bug() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.black,
    },
    pargaraph: {
      fontSize: 16,
      padding: 10,
      textAlign: 'center',
      color: COLORS.grey,
    },
    inputsContainer: {
      padding: 10,
      backgroundColor: COLORS.white,
      width: '90%',
      borderRadius: 15,
    },
    subjectInput: {
      borderColor: COLORS.primary,
      borderWidth: 2,
      borderRadius: 15,
    },
    descriptionInput: {
      borderColor: COLORS.primary,
      borderWidth: 2,
      borderRadius: 15,
      marginVertical: 10,
    },
    reportBtn: {
      textAlign: 'center',
      backgroundColor: COLORS.primary,
      color: COLORS.white,
      padding: 8,
      borderRadius: 15,
    },
  });
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const sendMail = async () => {
    if (subject.length === 0 && description.length === 0) {
      return false;
    }
    const mailQuery = JSON.stringify({
      subject: subject,
      body: description,
    });

    let mailUrl = 'mailto:alibenamor30@gmail.com?' + mailQuery;

    const canOpen = await Linking.canOpenURL(mailUrl);
    if (canOpen) {
      return Linking.openURL(mailUrl);
    }
    Alert.alert('Error', 'Unhandled error occured');
    return null;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.pargaraph}>
        The app is at her first steps (BETA) so you will face some fancy BuGs
        😎.
      </Text>
      <Text style={styles.pargaraph}>
        So please if you encoured any bug report it so we can fix it. Thanks
        (●'◡'●)
      </Text>
      <View style={styles.inputsContainer}>
        <Text style={{textAlign: 'center', marginVertical: 8}}> Subject </Text>
        <TextInput
          placeholder="Subject"
          style={styles.subjectInput}
          value={subject}
          onChangeText={(text) => setSubject(text)}
        />
        <Text style={{textAlign: 'center', marginVertical: 8, color: 'black'}}>
          Bug Description
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={6}
          placeholder="Bug description"
          style={styles.descriptionInput}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Text style={styles.reportBtn} onPress={() => sendMail().then(() => Alert.alert("Sent", "Thank you for the effort to report a bug we will try to fix it very soon. Stay tunned"))}>
          Report
        </Text>
      </View>
    </View>
  );
}
