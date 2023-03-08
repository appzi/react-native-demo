/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import {View} from 'react-native';
import {SurveyData} from './appzi.types';
const buildMarkup = (
  surveyId: string,
  customData?: SurveyData,
  embedRoot = 'https://w.appzi.io/e.js',
) =>
  `<!DOCTYPE html><html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
          window.appziSettings = {
            data: ${JSON.stringify(customData ?? {})}
          }
        </script>
        <style>
        html, body {width:100%}
        *{margin:0;padding:0}
        </style>
        </head>
        <body>
            <appzi-survey survey-id="${surveyId}"><script src="${embedRoot}"></script></appzi-survey>
        </body>
    </html>`;
export const AppziSurvey: React.FC<{
  surveyId: string;
  surveyData?: SurveyData;
}> = ({surveyId, surveyData}) => {
  const [desiredHeight, setDesiredHeight] = useState(10);
  const markup = buildMarkup(surveyId, surveyData);
  const onMessage = (e: any) => {
    const msg = JSON.parse(e.nativeEvent.data);

    if (msg.type === 'w-size') {
      const newHeight = msg.height;
      setDesiredHeight(newHeight);
    }
  };

  return (
    <View
      style={{
        overflow: 'hidden',
        flex: 1,
        height: desiredHeight,
        width: '100%',
      }}>
      <WebView
        scrollEnabled={false}
        originWhitelist={['*']}
        source={{html: markup}}
        style={{flex: 1}}
        onMessage={onMessage}
      />
    </View>
  );
};
