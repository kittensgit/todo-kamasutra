import React, { ChangeEvent, useState } from "react"

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string)=> void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const acivateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
            ? <input onChange={onChangeTitleHandler} value={title} onBlur={acivateViewMode} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}