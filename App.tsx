import { SafeAreaView, Button ,ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import * as Yup from 'yup'
import {Formik} from 'formik'


const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4, 'Should be min of 4 character')
  .max(16, 'Should be max of 16 character')
  .required('This is required field')
})

export default function App() {

  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)
  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = ''

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if(upperCase){
      characterList += upperCaseChars
    }
    if(lowerCase){
      characterList += lowerCaseChars
    }
    if(numbers){
      characterList += digitChars
    }
    if(symbols){
      characterList += specialChars
    }

    const passwordResult = createPassword(characterList, passwordLength)
    setPassword(passwordResult)
    setIsPassGenerated(true)

  }
  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
  }
  const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  }

  const styles = getStyles(isDarkMode);

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={{backgroundColor: isDarkMode ? '#121212' : '#FFFFFF'}}>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Button  title="Toggle Dark Mode" onPress={toggleDarkMode} />
          <Formik
       initialValues={{ passwordLength: '' }}
       validationSchema={PasswordSchema}
       onSubmit={values => {
        console.log(values);
        // ****We can use both (+ and Number) for changing sting to int just like the below code *****
        // generatePasswordString(Number(values.passwordLength)) OR below
        generatePasswordString(+values.passwordLength)
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         isValid,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
          <>
          <View style={[styles.inputWrapper, {height: '12%'}]}>
            <View style={styles.inputColumn}>
              <Text style={styles.heading}>Password Length</Text>
              <Text style={styles.errorText}>{touched.passwordLength && errors.passwordLength ? errors.passwordLength : ''}</Text>

              
              {/* {touched.passwordLength && errors.passwordLength} */}
              
            </View>
              <TextInput 
              style={styles.inputStyle} 
              value={values.passwordLength} 
              onChangeText={handleChange('passwordLength')}
              placeholder='Ex. 8'
              keyboardType='numeric' 
              />
          </View>
          <View style={[styles.inputWrapper, {height: '12%'}]}>
              <Text style={styles.heading}>Include Lowercase</Text>
              <BouncyCheckbox 
              isChecked={lowerCase}
              onPress={() => setLowerCase(!lowerCase)}
              fillColor='#29AB87'
              style={{flexDirection: 'column', top: '31%', marginRight: 12 }}
              />
          </View>
          <View style={[styles.inputWrapper, {height: '12%'}]}>
              <Text style={styles.heading}>Include Uppercase</Text>
              <BouncyCheckbox 
              isChecked={upperCase}
              onPress={() => setUpperCase(!upperCase)}
              fillColor='#29AB87'
              style={{flexDirection: 'column', top: '31%', marginRight: 12 }}
              />
          </View>
          <View style={[styles.inputWrapper, {height: '12%'}]}>
              <Text style={styles.heading}>Include Numbers</Text>
              <BouncyCheckbox 
              isChecked={numbers}
              onPress={() => setNumbers(!numbers)}
              fillColor='#29AB87'
              style={{flexDirection: 'column', top: '31%', marginRight: 12 }}
              />
          </View>
          <View style={[styles.inputWrapper, {height: '12%'}]}>
              <Text style={styles.heading}>Include Symbols</Text>
              <BouncyCheckbox 
              isChecked={symbols}
              onPress={() => setSymbols(!symbols)}
              fillColor='#29AB87'
              style={{flexDirection: 'column', top: '31%',  marginRight: 12 }}
              />
          </View>

          <View style={styles.formActions}>
            <TouchableOpacity 
            disabled={!isValid} 
            style={styles.primaryBtn} 
            onPress={() => handleSubmit()}>
              <Text style={styles.primaryBtnTxt}>Generate Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryBtn} onPress={ () => {
              handleReset()
              resetPasswordState()
            }}>
              <Text style={styles.secondaryBtnTxt}>Reset</Text>
            </TouchableOpacity>
          </View>
          </>
       )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: isDarkMode ? '#121212' : '#ffffff',
  },
  formContainer: {
    margin: 8,
    padding: 8,
    backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5',
    height: 680
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
    color: isDarkMode ? '#ffffff' : '#000000',
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
    color: isDarkMode ? '#ffffff' : '#000'
  },
  inputWrapper: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: isDarkMode ? '#2e2e2e' : '#FFFFFF',
    marginTop: 8,
    borderRadius: 8,
    paddingHorizontal: 10,
    elevation: 6
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: isDarkMode ? '#b0b0b0' : '#16213e', // Adjust border color
    color: isDarkMode ? '#ffffff' : '#000000', // Text color in input
    backgroundColor: isDarkMode ? '#2e2e2e' : '#ffffff',
  },
  errorText: {
    fontSize: 12,
    color: isDarkMode ? '#ff8080' : '#ff0d10',
    
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
     
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: isDarkMode ? '#4A90E2' : '#5DA3FA',
  },
  primaryBtnTxt: {
    color: isDarkMode ? '#ffffff' : '#000',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: isDarkMode ? '#3b3b3b' : '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    color: isDarkMode ? '#ffffff' : '#000000',
    paddingTop: 7 
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: isDarkMode ? '#000' : '#000',
  },
})