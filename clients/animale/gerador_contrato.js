const PDFDocument = require('pdfkit');
const fs = require('fs');

console.log("Gerando contrato de permuta em PDF...");

// Create a document
const doc = new PDFDocument({ margin: 50 });

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('Contrato_Permuta_Animale.pdf'));

// Header
doc.font('Helvetica-Bold')
    .fontSize(20)
    .text('CONTRATO DE PERMUTA DE SERVIÇOS', { align: 'center' });

doc.font('Helvetica')
    .fontSize(12)
    .fillColor('gray')
    .text('Tecnologia Inteligente & Saúde Animal', { align: 'center' });

doc.moveDown(2);

// Section 1
doc.fillColor('black')
    .font('Helvetica-Bold')
    .fontSize(14)
    .text('1. AS PARTES');

doc.font('Helvetica')
    .fontSize(12)
    .text('PRESTADOR DE TECNOLOGIA: Gabriel Lima — Experia Solutions, provedor de Governança Digital Autônoma.', { align: 'justify' })
    .text('RECEPTOR / PRESTADOR VETERINÁRIO: Hovet Animale.', { align: 'justify' });

doc.moveDown(1);

// Section 2
doc.font('Helvetica-Bold')
    .fontSize(14)
    .text('2. O OBJETO');

doc.font('Helvetica')
    .fontSize(12)
    .text('O presente instrumento tem como objeto a permuta de serviços entre as partes. O PRESTADOR DE TECNOLOGIA fornecerá a licença, hospedagem e operação do sistema autônomo de inteligência artificial da Experia, incluindo:', { align: 'justify' })
    .moveDown(0.5)
    .text('• Atendimento contínuo (24/7) via WhatsApp.', { indent: 20 })
    .text('• Relatório matinal consolidado no Telegram do gestor.', { indent: 20 })
    .text('• Gestão e qualificação de leads.', { indent: 20 })
    .moveDown(0.5)
    .text('O prazo de prestação deste serviço, em contrapartida integral aos custos veterinários abaixo, será de 3 (três) meses.', { align: 'justify' });

doc.moveDown(1);

// Section 3
doc.font('Helvetica-Bold')
    .fontSize(14)
    .text('3. A PRONTA-CONTRAPARTIDA');

doc.font('Helvetica')
    .fontSize(12)
    .text('O RECEPTOR prestará os serviços médico-veterinários necessários, urgentes e emergenciais para o tratamento do felino de nome "Tigrinho" (tutor: Gabriel Lima), diagnosticado com obstrução uretral (incluindo desobstrução, fluidoterapia, sedação e internação parcial), abatendo o valor integral orçado em R$ 1.126,88 (um mil, cento e vinte e seis reais e oitenta e oito centavos).', { align: 'justify' });

doc.moveDown(1);

// Section 4
doc.font('Helvetica-Bold')
    .fontSize(14)
    .text('4. VIGÊNCIA E RENOVAÇÃO');

doc.font('Helvetica')
    .fontSize(12)
    .text('Este acordo tem validade para o período de 26/02/2026 a 26/05/2026. Após este período, a clínica veterinária poderá optar por assinar a licença mensal do sistema, ou o serviço será interrompido sem multas ou taxas adicionais para nenhuma das partes.', { align: 'justify' });

doc.moveDown(1);

// Section 5
doc.font('Helvetica-Bold')
    .fontSize(14)
    .text('5. FORO E ACORDO');

doc.font('Helvetica')
    .fontSize(12)
    .text('As partes assinam este acordo de boa-fé, reconhecendo o valor mútuo de preservar uma vida animal enquanto moderniza ativamente as operações clínicas.', { align: 'justify' });

doc.moveDown(4);

// Signatures
const signatureY = doc.y;

// Signature 1
doc.moveTo(50, signatureY)
    .lineTo(250, signatureY)
    .stroke();

doc.font('Helvetica-Bold')
    .text('Gabriel Lima', 50, signatureY + 10)
    .font('Helvetica')
    .fontSize(10)
    .fillColor('gray')
    .text('Experia Solutions', 50, signatureY + 25)
    .text('26 de fevereiro de 2026', 50, signatureY + 40);

// Signature 2
doc.fillColor('black');
doc.moveTo(320, signatureY)
    .lineTo(520, signatureY)
    .stroke();

doc.font('Helvetica-Bold')
    .fontSize(12)
    .text('Responsável', 320, signatureY + 10)
    .font('Helvetica')
    .fontSize(10)
    .fillColor('gray')
    .text('Hovet Animale', 320, signatureY + 25)
    .text('26 de fevereiro de 2026', 320, signatureY + 40);

// Finalize PDF file
doc.end();

console.log("✅ Contrato salvo com sucesso em: ./Contrato_Permuta_Animale.pdf");
