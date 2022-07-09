import * as React from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { TransText, TranslationConsumer } from 'react-native-translation';

const Langue = (props) => {
    const [checked, setChecked] = React.useState('first');

    const { languee } = props;

    return (
        <View>
            <Text>{languee}</Text>


            <RadioButton
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => {
                    setChecked('second');
                    updateLanguage("en-US");
                    //  setLanguage('English')
                }
                }
            />

            <TranslationConsumer>
                {({ language, updateLanguage }) => {
                    return (

                        <RadioButton
                            value="first"
                            status={checked === 'first' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked('first');
                                updateLanguage("fr-FR");
                                //  setLanguage('Français')
                            }
                            }
                        />
                    )

                }}

            </TranslationConsumer>
        </View>
    );
};

export default Langue;