import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

class ReviewScreen extends Component {
    static navigationOptions = {
        title: 'Review Jobs',
        header: ({ navigate }) => {//<-- I should be navigation object but here we only need access to navigate method of the entire object
            return {
                right: (
                    <Button
                        title="Settings"
                        onPress={() => navigate('settings')}
                        backgroundColor="rgba(0,0,0,0)"
                        color="rgba(0, 122, 255, 1)"
                    />
                ),
                style: {
                    marginTop: Platform.OS === 'android' ? 24 : 0
                }
            };
        }
    };

    render() {
        return (
            <View>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
            </View>
        );
    }
}

export default ReviewScreen;