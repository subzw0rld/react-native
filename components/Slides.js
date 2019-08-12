import React, { Component } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    renderLastSlide(index) {
        if (index === this.props.data.length - 1) {
            return (
                <Button
                    title="Onwards!"
                    raised
                    buttonStyle={styles.buttonStyle}
                    onPress={this.props.onComplete}
                />
            );
        }
    }

    renderSlides() {
        return this.props.data.map((slide, index) => {
            return (
                <View
                    style={[styles.slideStyle, { backgroundColor: slide.color }]}
                    key={slide.text}>
                    <Text
                        style={styles.textStyle}>
                        {slide.text}
                    </Text>
                    {this.renderLastSlide(index)}
                </View>
            );
        });
    }
    render() {
        return (
            <ScrollView
                horizontal
                pagingEnabled
                style={{ flex: 1 }}
            >
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    textStyle: {
        color: 'white',
        fontSize: 30,
        justifyContent: 'center'
    },
    buttonStyle: {
        backgroundColor: '#0288D1',
        marginTop: 15
    }
};

export default Slides;