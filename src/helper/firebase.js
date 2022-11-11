import dotenv from 'dotenv';
import { GOOGLE_APPLICATION_CREDENTIALS } from "../config.js";
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import admin from 'firebase-admin';

dotenv.config();

const firebaseApp = initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCoGnce23KyNo27\nnObI2ZQAuA2/ktwHxxOk4It67ThiyUil4sxPdo6EaeArtcJgzJL4kHbH4OWJK4gb\nN9Z8n7v4j55WYLSGB2ihyNP8Xlxy0AjRL66DflToxI8aSlX1YmKFNjTK4c+axkDd\nRQwHWwmRd/RV1g4O86eyoYyt0EgA2oXnSLqrLqSEjeJFW/MEMwXyiRb/A/C1iqB/\nOdTQ/psxboSAnKAVuRwWdFB5t7Knaap2y5Vw3tqRxrX7PjHCpDorevO+piu+ghy5\n+fb80LZZYNvJwbV+ZWqieG+AxDbMyPKg7a+LyAvcHth4OqQ854mvQOdS+SS22qbE\n5qIAXK0TAgMBAAECggEAHHR6ZH1GEXedjzv0btwxqtt87Eg6OZDPuPGPeqvsBwDG\nbNoStoK9hhl76jo2oHcQi8W8bYIaqJj3TZAqnObXBTCeX0W4WRWo9vXNOGNqp76i\nN3KoSjbYvZwEEzGxEjvorF7sGcmWgD793Naivh4BZR/Weq8kqxBAe0LQUt22Snps\nKe7SVWrQaN4NrFrdReMRbTZzxM1cDq6O7cuTSGr7jUdyTfUQo2f7gaRqdmsT95uU\nFKikzBCP8TR18WsJQxlN3MzT+m9gK3ToqteLAmO5HBMJDpy00gACayic0mDZWBAu\nRqcuMZSUNZORdWMdQh669b6oBCdj5tEmuaznA7j+jQKBgQDsc1aPPSwQOxjnBJyZ\nPiBt/5NITI/VhlaSfqNCJkfMRTV0Gku2zadNZsPUpcliGbw4LlbUt8uG/9HX6kH5\nq4a7seI4AtEGuVrQVKVvHto0ggHmoWBImuIIDQViYnGPRruLH5pIGny2N2RVEcxP\ny+bW1xiqSf2YQfG0F1ggWWndPQKBgQC2AIF4ErRF22TidZGiDifuoTbWbvObhhhz\n2qlmz1qDpBLzf5xqZUgev2Ic/Kj+yfDiJCm4aRtbYBoQP8j2PPiGuPLu6VfNQJLp\nxbRk7j/m+qPfcHRE2JoYJXssteLJGiJZmvn2egi0rkafNVthcI2RVnbR1lTpUtYP\nDfqsa/P4jwKBgQDcES0K++A66wXuXbhyWARO3IPz0m48SV/h0MOaGY7Ra8ioWqEF\nbrq7q12wWOzpxRINJ/Pg338qEob38iudeCtaHeFySAzLuU/wfhfLKGfmXunuAVxf\ntueQnq3YN8+Bjk+W2L77RMu1vDBBjOMfkaMzadanB15ji1yuRNvcn9uL8QKBgQCq\nSRLZy3ZMHhfoImReIayPAtuSCkF3dCGQ1DfHb56aqHrqxK0OhzDRQ/OCd4uOyFbO\n31MBraXg+quoJGXcrfNB6e2yRzTVX+OVQlukS54SeNO2jTrb52VVzkvO62cDDaax\n++SADnHyy1RcRcn4Ax0RrLqDXmwX2l9ZupSdmmusVQKBgFs9z4xBTh21OaisQtBt\n07jtuhiqzirV/7/XI5JfiRiiCOlNA0eFhrpQ0ilNCIyOC9vvukSLu1CcSUy/Nmrq\nXVn6r2tAdRrUSX/CORUhaERpthpliUwxo7/bNC+Dw2jed2Vyp0qnQX/gkLMvr0aS\nfCBSXlmBZHSafKlC4xhQx8UW\n-----END PRIVATE KEY-----\n",
      }),
});

export default firebaseApp;
