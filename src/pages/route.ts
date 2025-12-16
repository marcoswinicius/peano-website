export async function POST(request: Request) {
  const requestData = await request.json();

  const requestBody = {
    from: 'onboarding@resend.dev',
    to: 'gabriel.franca.melao@gmail.com',
    subject: 'Novo contato no site Food2B',
    html: `<h2><strong>Um novo usuário solicitou um contato no site da Food2B:</strong></h2>
    <p><strong>Nome: </strong>${requestData.firstname} ${requestData.lastname}</p>
    <p><strong>E-mail: </strong>${requestData.email}</p>
    <p><strong>Telefone: </strong> <a href="tel:${requestData.phone}">${requestData.phone}</a></p>
    <p><strong>Empresa: </strong>${requestData.company}</p>  
    <p><strong>Função: </strong>${requestData.jobtitle}</p>    
    <p><strong>Mensagem: </strong>${requestData.message}</p>
    `
  };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.RESEND_API_KEY!}`,
    },
    body: JSON.stringify(requestBody),
  });

  const responseData = await response.json();

  return Response.json(responseData);
}