"use client"

import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react"

interface outPutItem {
  prefix: "$" | ">" | null
  code: string
  style?: CSSProperties
}

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

export type TCommand = (params: {
  setOutPutItemList: Dispatch<SetStateAction<outPutItem[]>>
}) => any

export type TCommandMap = Record<string, TCommand>

interface ITerminal {
  commandMap: TCommandMap
}

let t: NodeJS.Timeout

export default function TerminalCore({ commandMap }: ITerminal) {
  const [isInputFocus, setIsInputFocus] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [outPutItemList, setOutPutItemList] =
    useState<outPutItem[]>(initOutPutItemList)
  const hiddenInputRef = useRef<HTMLInputElement>(null)
  const codeContainerRef = useRef<HTMLDivElement>(null)

  const commandHandler = (value: string) => {
    let handledvalue = value.trim()

    if (typeof commandMap[handledvalue] === "function") {
      commandMap[handledvalue]({ setOutPutItemList })
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
    }

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

  const onInputChange = (e: any) => {
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

  const onInputKeyDown = (e: any) => {
    if (e.code === "Enter") {
      const value = e.target.value

      commandHandler(value)
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
    <div className="wrapper">
      <div
        className="mockup-code bg-[#373b47] text-white md:w-1/2 2xl:w-1/3"
        onClick={inputfocusHandler}
      >
        <div
          ref={codeContainerRef}
          className="scrollbar-hidden max-h-96 overflow-auto"
        >
          {outPutItemList.map((outPutItem, index) => {
            return (
              <div style={outPutItem.style}>
                {(() => {
                  if (outPutItem.prefix === "$") {
                    if (index === outPutItemList.length - 1) {
                      return (
                        <pre data-prefix="$" key={index} className="relative">
                          <code>{outPutItem.code}</code>
                          {isInputFocus ? (
                            <span className="cursor-blink absolute top-[6px] ml-1 inline-block h-[13px] w-1 bg-white" />
                          ) : null}
                        </pre>
                      )
                    }

                    return (
                      <pre data-prefix="$" key={index}>
                        <code>{outPutItem.code}</code>
                      </pre>
                    )
                  }

                  if (outPutItem.prefix === ">") {
                    return (
                      <pre data-prefix=">" key={index}>
                        <code>{outPutItem.code}</code>
                      </pre>
                    )
                  }

                  return (
                    <pre key={index}>
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
