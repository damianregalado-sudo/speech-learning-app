// Formant frequency ranges for Spanish vowels
const VOWEL_FORMANTS = {
  'a': { F1: 700, F2: 1200 },
  'e': { F1: 400, F2: 2300 },
  'i': { F1: 250, F2: 2500 },
  'o': { F1: 500, F2: 1000 },
  'u': { F1: 300, F2: 600 }
}

const SYLLABLE_VOWELS = {
  'PA': 'a', 'PE': 'e', 'PI': 'i', 'PO': 'o', 'PU': 'u',
  'MA': 'a', 'ME': 'e', 'MI': 'i', 'MO': 'o', 'MU': 'u',
  'BA': 'a', 'BE': 'e', 'BI': 'i', 'BO': 'o', 'BU': 'u',
  'TA': 'a', 'TE': 'e', 'TI': 'i', 'TO': 'o', 'TU': 'u',
  'LA': 'a', 'LE': 'e', 'LI': 'i', 'LO': 'o', 'LU': 'u',
}

export function analyzeAudio(audioBuffer, syllable) {
  const vowel = SYLLABLE_VOWELS[syllable] || 'a'
  const expected = VOWEL_FORMANTS[vowel]

  const offlineContext = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(
    1, audioBuffer.length, audioBuffer.sampleRate
  )
  const source = offlineContext.createBufferSource()
  source.buffer = audioBuffer

  // Create analyser
  const analyser = offlineContext.createAnalyser()
  analyser.fftSize = 2048
  source.connect(analyser)
  analyser.connect(offlineContext.destination)
  source.start(0)

  const frequencyData = new Uint8Array(analyser.frequencyBinCount)
  analyser.getByteFrequencyData(frequencyData)

  const detected = detectFormants(frequencyData, audioBuffer.sampleRate)
  const similarity = calculateFormantSimilarity(detected, expected)

  return {
    similarity: Math.max(0, Math.min(100, similarity)),
    detected,
    expected
  }
}

function detectFormants(frequencyData, sampleRate) {
  const nyquist = sampleRate / 2
  const binWidth = nyquist / frequencyData.length

  let f1 = 0, f2 = 0
  let f1Strength = 0, f2Strength = 0

  for (let i = 0; i < frequencyData.length; i++) {
    const freq = i * binWidth
    const strength = frequencyData[i]

    // F1: 200-900 Hz
    if (freq >= 200 && freq <= 900 && strength > f1Strength) {
      f1 = freq
      f1Strength = strength
    }
    // F2: 1000-3000 Hz
    if (freq >= 1000 && freq <= 3000 && strength > f2Strength) {
      f2 = freq
      f2Strength = strength
    }
  }

  return { F1: f1, F2: f2 }
}

function calculateFormantSimilarity(detected, expected) {
  const tolerance = 150
  const f1Match = Math.abs(detected.F1 - expected.F1) <= tolerance ? 100 : 0
  const f2Match = Math.abs(detected.F2 - expected.F2) <= tolerance ? 100 : 0

  const avgDiff = (Math.abs(detected.F1 - expected.F1) + Math.abs(detected.F2 - expected.F2)) / 2
  const similarity = Math.max(0, 100 - (avgDiff / 150) * 50)

  return Math.round(similarity)
}

export function recordAudio() {
  return new Promise(async (resolve, reject) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      const audioChunks = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const arrayBuffer = await audioBlob.arrayBuffer()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

        stream.getTracks().forEach(track => track.stop())
        resolve(audioBuffer)
      }

      mediaRecorder.start()
      resolve({ mediaRecorder, stop: () => mediaRecorder.stop() })
    } catch (err) {
      reject(err)
    }
  })
}
