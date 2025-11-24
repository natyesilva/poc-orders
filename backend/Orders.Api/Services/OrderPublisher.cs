using Azure.Messaging.ServiceBus;

public class OrderPublisher
{
    private readonly ServiceBusClient _client;
    private readonly ServiceBusSender _sender;

    public OrderPublisher(IConfiguration config)
    {
        var conn = config["SERVICEBUS_CONNECTION"];
        var queue = config["SERVICEBUS_QUEUE"];
        _client = new ServiceBusClient(conn);
        _sender = _client.CreateSender(queue);
    }

    public async Task PublishAsync(int orderId)
    {
        var message = new ServiceBusMessage(orderId.ToString());
        message.ApplicationProperties["EventType"] = "OrderCreated";
        message.CorrelationId = orderId.ToString();

        await _sender.SendMessageAsync(message);
    }
}
