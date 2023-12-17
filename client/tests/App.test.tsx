// @ts-expect-error: React is needed for the App component.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import App from '../src/App.tsx'
import renderer from 'react-test-renderer'

describe('App rendering specification', () => {
    it('App renders without crashing', () => {
        const component = renderer.create(<App />)
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})