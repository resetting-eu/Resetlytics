'use client'

import React from 'react'
import { TagCloud } from 'react-tagcloud'

const colours = {
    hue: '#46b3c2',
}

export default function WordCloudChart({ tendency, words_cloud }
    :
    { tendency: string, words_cloud: Array<any> }) {
    const tendency_lower = tendency.toLowerCase()
    let wcloud: { value: any; count: any }[] = []
   
    words_cloud.forEach((v) => {
        if (v.tendency.toLowerCase() === tendency_lower) {
            wcloud.push({ value: v.words, count: v.count_words })
        }
    })

    return (
        <TagCloud
            minSize={20}
            maxSize={60}
            colorOptions={colours}
            tags={wcloud}
        //onClick={(tag) => console.log('clicking on tag:', tag)}
        />
    )
}
