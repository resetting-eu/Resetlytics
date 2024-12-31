import { http } from 'msw'
import { createSurvey, getResults, getSurvey, getSurveys, postResult, removeSurvey, updateSurvey } from '../models/in-memory-storage'
import { apiBaseAddress } from '../models/survey'

export const handlers = [
    http.get(apiBaseAddress + '/surveys', (info) => {
        // const { userId } = req.params
        // return res(
        //   ctx.json({
        //     id: userId,
        //     firstName: 'John',
        //     lastName: 'Maverick',
        //   }),
        // )
        return res(
            ctx.json(getSurveys()),
        )
    }),
    // req, res, ctx
    http.get(apiBaseAddress + '/getActive', (info) => {
        return res(
            ctx.json(getSurveys()),
        )
    }),
    http.get(apiBaseAddress + '/create', (info) => {
        return res(
            ctx.json(createSurvey()),
        )
    }),
    http.get(apiBaseAddress + '/delete', (info) => {
        const id = req.url.searchParams.get('id')
        removeSurvey(id as string);
        return res(
            ctx.json({ id }),
        )
    }),
    http.get(apiBaseAddress + '/getSurvey', (info) => {
        const surveyId = req.url.searchParams.get('surveyId')
        return res(
            ctx.json(getSurvey(surveyId as string)),
        )
    }),
    http.post(apiBaseAddress + '/changeJson', (info) => {
        const { id, json } = req.body as Record<string, any>
        updateSurvey(id as string, json)
        return res(
            ctx.json({ id, json }),
        )
    }),
    http.post(apiBaseAddress + '/post', (info) => {
        const { postId, surveyResult } = req.body as Record<string, any>
        postResult(postId as string, surveyResult)
        return res(
            ctx.json({}),
        )
    }),
    http.get(apiBaseAddress + '/results', (info) => {
        const postId = req.url.searchParams.get('postId')
        return res(
            ctx.json({ id: postId, data: getResults(postId as string) }),
        )
    })
]
