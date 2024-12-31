import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { surveytheme } from "@/styles/surveytheme" 
import { jsonservicequality } from "@/lib/db/model/jsonservicequality";
import { jsonsustainability } from "@/lib/db/model/jsonsustainability";

import { ISurvey } from "@/lib/db/definitions";

export default function SurveyView({ survey } : { survey: ISurvey }) {
    
    // before set "showTOC": true,
    const json = (survey.slug == '1') ?
        {...jsonservicequality, showTOC: true}
        :
        {...jsonsustainability, showTOC: true}

    const model = new Model(json);
    model.applyTheme(surveytheme)
    model.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });
    model.mode = "display";
    return (<Survey model={model} />);
}
