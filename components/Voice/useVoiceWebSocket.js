import { useState, useEffect, useRef, useCallback } from 'react';

const WS_URL = `ws://${window.location.hostname}:3001/voice`;
const AUDIO_SAMPLE_RATE = 16000;

export function useVoiceWebSocket() {
    const [isConnected, setIsConnected] = useState(false);
    const [isAiSpeaking, setIsAiSpeaking] = useState(false);

    const wsRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioContextRef = useRef(null);
    const streamRef = useRef(null);

    // Initialize WebSocket connection
    useEffect(() => {
        const ws = new WebSocket(WS_URL);
        ws.binaryType = 'arraybuffer';

        ws.onopen = () => {
            console.log('✅ Voice WebSocket connected');
            setIsConnected(true);
        };

        ws.onclose = () => {
            console.log('❌ Voice WebSocket disconnected');
            setIsConnected(false);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onmessage = async (event) => {
            if (event.data instanceof ArrayBuffer) {
                // Binary audio data received
                await playAudioChunk(event.data);
            } else {
                // Control message
                const message = JSON.parse(event.data);
                console.log('Control message:', message);
            }
        };

        wsRef.current = ws;

        return () => {
            ws.close();
        };
    }, []);

    // Play received audio chunk
    const playAudioChunk = useCallback(async (arrayBuffer) => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
                    sampleRate: AUDIO_SAMPLE_RATE
                });
            }

            const audioContext = audioContextRef.current;
            setIsAiSpeaking(true);

            // Convert raw PCM to playable format
            const audioData = new Float32Array(arrayBuffer.byteLength / 2);
            const dataView = new DataView(arrayBuffer);

            for (let i = 0; i < audioData.length; i++) {
                audioData[i] = dataView.getInt16(i * 2, true) / 32768;
            }

            // Create audio buffer
            const audioBuffer = audioContext.createBuffer(1, audioData.length, AUDIO_SAMPLE_RATE);
            audioBuffer.getChannelData(0).set(audioData);

            // Play audio
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.onended = () => setIsAiSpeaking(false);
            source.start();

        } catch (error) {
            console.error('Error playing audio:', error);
            setIsAiSpeaking(false);
        }
    }, []);

    // Start recording from microphone
    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    sampleRate: AUDIO_SAMPLE_RATE,
                    channelCount: 1,
                    echoCancellation: true,
                    noiseSuppression: true
                }
            });

            streamRef.current = stream;

            // Create audio context for processing
            const audioContext = new (window.AudioContext || window.webkitAudioContext)({
                sampleRate: AUDIO_SAMPLE_RATE
            });

            const source = audioContext.createMediaStreamSource(stream);
            const processor = audioContext.createScriptProcessor(4096, 1, 1);

            processor.onaudioprocess = (e) => {
                if (wsRef.current?.readyState === WebSocket.OPEN) {
                    const inputData = e.inputBuffer.getChannelData(0);

                    // Convert float32 to int16 PCM
                    const pcmData = new Int16Array(inputData.length);
                    for (let i = 0; i < inputData.length; i++) {
                        pcmData[i] = Math.max(-32768, Math.min(32767, inputData[i] * 32768));
                    }

                    wsRef.current.send(pcmData.buffer);
                }
            };

            source.connect(processor);
            processor.connect(audioContext.destination);

            audioContextRef.current = audioContext;

            // Send control message
            wsRef.current?.send('START_RECORDING');

            console.log('🎤 Recording started');
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    }, []);

    // Stop recording
    const stopRecording = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }

        wsRef.current?.send('STOP_RECORDING');
        console.log('🔇 Recording stopped');
    }, []);

    return {
        isConnected,
        isAiSpeaking,
        startRecording,
        stopRecording
    };
}