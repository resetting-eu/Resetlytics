'use client'
import { useCallback } from 'react';

import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { surveytheme } from "@/styles/surveytheme" 
import { jsonservicequality } from "@/lib/db/model/jsonservicequality";
import { jsonsustainability } from "@/lib/db/model/jsonsustainability";

import { ISurvey } from "@/lib/db/definitions";

export default function SurveyRun({ survey }: { survey: ISurvey }) {
    //console.log('SURVEY RUN ',survey)
    const model = survey.slug === '1' ? 
    new Model(jsonservicequality) :
        new Model(jsonsustainability);
    model.applyTheme(surveytheme)
    model.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });

    /*
const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
  }, []);
    */
    //survey.onComplete.add(surveyComplete);

    return (<Survey model={model} />);
}

/*
const surveyComplete = useCallback((survey) => {
    const userId =  ... Getting the user ID ...  
    survey.setValue("userId", userId);

    saveSurveyResults(
      "https://your-web-service.com/" + SURVEY_ID,
      survey.data
    )
  }, []);
*/

/*

function saveSurveyResults(url, json) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(json)
  })
  .then(response => {
    if (response.ok) {
      // Handle success
    } else {
      // Handle error
    }
  })
  .catch(error => {
    // Handle error
  });
}
*/