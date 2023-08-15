"use client"

import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react"

import { ITerminal, outPutItem } from "./types"

const initOutPutItemList: outPutItem[] = [
  {
    prefix: null,
    code: "//enter rg -h or rg --help before using it",
    style: {
      color: "#999",
      fontStyle: "italic",
    },
  },
  {
    prefix: "$",
    code: "",
  },
]

let t: NodeJS.Timeout

export const Core = ({ commandMap }: ITerminal) => {
  const [isInputFocus, setIsInputFocus] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [outPutItemList, setOutPutItemList] =
    useState<outPutItem[]>(initOutPutItemList)
  const hiddenInputRef = useRef<HTMLInputElement>(null)
  const codeContainerRef = useRef<HTMLDivElement>(null)

  const commandHandler = (value: string) => {
    let handledvalue = value.trim()

    const next = () => {
      setOutPutItemList((oldData) => {
        return [
          ...oldData,
          {
            prefix: "$",
            code: "",
          },
        ]
      })

      setInputValue("")

      clearTimeout(t)

      t = setTimeout(() => {
        if (codeContainerRef.current) {
          codeContainerRef.current.scrollTo({
            top: codeContainerRef.current.scrollHeight,
            behavior: "smooth",
          })
        }
      }, 0)
    }

    if (typeof commandMap[handledvalue] === "function") {
      commandMap[handledvalue]({ setOutPutItemList, next: next })
    } else {
      switch (value) {
        case "":
          break

        case "clear":
          setOutPutItemList([])
          break

        default:
          setOutPutItemList((oldData) => {
            return [
              ...oldData,
              {
                prefix: null,
                code: "command not found: " + value,
              },
            ]
          })
          break
      }
      next()
    }
  }

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.replace(/\s+/g, " ")

    setInputValue(value)

    setOutPutItemList((oldData) => {
      const clonedOldData = structuredClone(oldData)

      const lastOne = clonedOldData.slice(-1)[0]
      const others = clonedOldData.slice(0, -1)

      return [
        ...others,
        {
          ...lastOne,
          code: value,
        },
      ]
    })
  }

  const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.code === "Enter") {
      commandHandler(inputValue)
    }
  }

  const onInputBlur = () => {
    setIsInputFocus(false)
  }

  const inputfocusHandler = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus()
      setIsInputFocus(true)
    }
  }

  useEffect(() => {
    inputfocusHandler()
  }, [])

  return (
    <div id="termimal-core">
      <div
        className="mockup-code bg-[#373b47] text-white"
        onClick={inputfocusHandler}
      >
        <div
          ref={codeContainerRef}
          className="scrollbar-hidden max-h-32 overflow-auto lg:max-h-96"
        >
          {outPutItemList.map((outPutItem, index) => {
            return (
              <div style={outPutItem.style} key={index}>
                {(() => {
                  if (outPutItem.prefix === "$") {
                    if (index === outPutItemList.length - 1) {
                      return (
                        <pre data-prefix="$" className="relative">
                          <code>{outPutItem.code}</code>
                          {isInputFocus ? (
                            <span className="cursor-blink absolute top-[2px] ml-1 inline-block h-[12px] w-1 bg-white md:top-[6px] md:h-[13px]" />
                          ) : null}
                        </pre>
                      )
                    }

                    return (
                      <pre data-prefix="$">
                        <code>{outPutItem.code}</code>
                      </pre>
                    )
                  }

                  if (outPutItem.prefix === ">") {
                    return (
                      <pre data-prefix=">">
                        <code>{outPutItem.code}</code>
                      </pre>
                    )
                  }

                  return (
                    <pre>
                      <code>{outPutItem.code}</code>
                    </pre>
                  )
                })()}
              </div>
            )
          })}
        </div>
      </div>
      <input
        className="absolute z-[-99]"
        ref={hiddenInputRef}
        value={inputValue}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
        onBlur={onInputBlur}
      />
    </div>
  )
}
