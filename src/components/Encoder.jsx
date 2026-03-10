import React, { useMemo, useState } from "react";
import CryptoJS from "crypto-js";

export default function Encoder() {

    const [message, setMessage] = useState('')
    const [secret, setSecret] = useState('')

    const [cipherToDecrypt, setCipherToDecrypt] = useState('');
    const [keyToDecrypt, setKeyToDecrypt] = useState('');
    
    const ciphertextResult = useMemo(() => {
        if (message && secret) {
            return CryptoJS.AES.encrypt(message, secret).toString();
        }
        return "";
    }, [message, secret]);

    const handleDecrypt = () => {
        try {
            if (cipherToDecrypt.length == 0) {
                alert("ERROR: Hash can not be empty.")
                return
            }else if (keyToDecrypt.length == 0) {
                alert("ERROR: Key to decrypt can no be empty.")
                return
            }

            if (cipherToDecrypt.length < 10) {
                alert("ERROR: Hash is too short.");
                return;
            } 
            
            const bytes = CryptoJS.AES.decrypt(cipherToDecrypt, keyToDecrypt);
            const originalText = bytes.toString(CryptoJS.enc.Utf8)

            if (!originalText) throw new Error()

            alert("Original message:  " + '"' + originalText + '"')
            
        } catch (e) {
            alert("ERROR: Invalid hash or the Key can not decrypt this message.")
        }
    }

    return(
        <div className="container">
            <h2>Crypto - Sandbox</h2>

            <h3><i className="nf nf-fa-lock"></i> Encrypt message</h3>
            <label>Message: </label>
            <input type="text" onChange={(e) => setMessage(e.target.value)} />
            <br />
            <label>Key: </label>
            <input type="password" onChange={(e) => setSecret(e.target.value)} />

            <p><i className="nf nf-dev-terminal"></i> Result:</p>            
            <code style={{ color: 'cyan', wordBreak: 'break-all' }}>
                {ciphertextResult || "..."}
            </code>
            <br />
            <button onClick={() => navigator.clipboard.writeText(ciphertextResult)} disabled={!ciphertextResult}>
                Copy Hash
            </button><br /><br />

            <hr />

            <h3><i className="nf nf-fa-unlock"></i> Decrypt message</h3>
            <label>Hash (Paste here): </label>
            <input type="text" onChange={(e) => setCipherToDecrypt(e.target.value)} />
            <br />
            <label>Key: </label>
            <input type="password" onChange={(e) => setKeyToDecrypt(e.target.value)} />
            <br />
            <button onClick={handleDecrypt}>Decrypt now</button>
        </div>
        
    )

}2