import { useState, useCallback } from 'react'
import { useHelia } from './useHelia'
import { CID } from 'multiformats/cid'


export const useCommitText = () => {
  const { helia, error, heliaStrings, starting } = useHelia()
  const [cid, setCid] = useState<CID | null>(null)
  const [cidString, setCidString] = useState('')
  const [committedText, setCommittedText] = useState('')

  const commitText = useCallback(async (text: string) => {
    if (!error && !starting && heliaStrings && helia) {
      try {
        const cid = await heliaStrings.add(
          text,
        )
        setCid(cid)
        setCidString(cid.toString())
        console.log('Added file:', cid.toString())
      } catch (e) {
        console.error(e)
      }
    } else {
      console.log('please wait for helia to start')
    }
  }, [error, starting, helia, heliaStrings])

  const fetchCommittedText = useCallback(async () => {
    let text = ''
    if (!error && !starting && heliaStrings && cid) {
      try {
        text = await heliaStrings.get(cid)
        setCommittedText(text)
      } catch (e) {
        console.error(e)
      }
    } else {
      console.log('please wait for helia to start')
    }
  }, [error, starting, cid, helia, heliaStrings])
  // If one forgets to add helia in the dependency array in commitText, additions to the blockstore will not be picked up by react, 
  // leading to operations on fs to hang indefinitely in the generator <suspend> state. As such it would be good practice to ensure 
  // to include helia inside the dependency array of all hooks to tell react that the useCallback needs the most up to date helia state

  return { cidString, committedText, commitText, fetchCommittedText }
}