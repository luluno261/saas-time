import { blink } from "./blink";

export async function seedDemoData(userId: string) {
  try {
    // Seed Integrations
    const integrations = [
      { id: 'int_wa_1', provider: 'whatsapp', name: 'WhatsApp Business Principal', account: '+33 6 12 34 56 78', status: 'connected' },
      { id: 'int_gm_1', provider: 'gmail', name: 'Gmail Marketing', account: 'contact@flowbot.ai', status: 'connected' },
      { id: 'int_hs_1', provider: 'hubspot', name: 'HubSpot Sales', account: 'Workspace Pro', status: 'disconnected' },
    ];

    for (const int of integrations) {
      await blink.db.integrations.create({
        id: int.id,
        provider: int.provider,
        name: int.name,
        status: int.status,
        config: JSON.stringify({ account: int.account }),
        userId
      });
    }

    // Seed Workflows
    const workflows = [
      { id: 'wf_1', name: 'Réponse Auto WhatsApp', desc: 'Répond instantanément aux nouveaux messages.', trigger: 'whatsapp_msg', status: 'active' },
      { id: 'wf_2', name: 'Séquence Lead Nurturing', desc: 'Convertit vos prospects par email.', trigger: 'crm_event', status: 'active' },
      { id: 'wf_3', name: 'Relance Panier Abandonné', desc: 'Récupère les ventes perdues.', trigger: 'cron', status: 'inactive' },
    ];

    for (const wf of workflows) {
      await blink.db.workflows.create({
        id: wf.id,
        name: wf.name,
        description: wf.desc,
        triggerType: wf.trigger,
        status: wf.status,
        config: '{}',
        userId
      });
    }

    // Seed Execution Logs
    for (let i = 0; i < 10; i++) {
      await blink.db.executionLogs.create({
        id: `log_${i}`,
        workflowId: i % 2 === 0 ? 'wf_1' : 'wf_2',
        status: i === 7 ? 'failed' : 'success',
        message: i === 7 ? 'API Connection Timeout' : 'Action executed successfully',
        payload: '{}',
        userId
      });
    }

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Seed failed:', error);
  }
}