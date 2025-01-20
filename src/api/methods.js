export default [
    {
        "api": "baiyujing_api",
        "method": "find_actor",
        "params": ["name"]
    },
    {
        "api": "baiyujing_api",
        "method": "eval_nfa_action_with_string_args",
        "params": ["nfa", "action", "args"]  
    },
    {
      "api": "baiyujing_api",
      "method": "get_nfa_action_info",
      "params": ["nfa", "action"]  
    },
    {
      "api": "database_api",
      "method": "set_subscribe_callback",
      "params": ["callback", "clearFilter"]
    },
    {
      "api": "database_api",
      "method": "set_pending_transaction_callback",
      "params": ["cb"]
    },
    {
      "api": "database_api",
      "method": "set_block_applied_callback",
      "params": ["cb"]
    },
    {
      "api": "database_api",
      "method": "cancel_all_subscriptions"
    },
    {
      "api": "baiyujing_api",
      "method": "get_block_header",
      "params": ["blockNum"]
    },
    {
      "api": "baiyujing_api",
      "method": "get_block",
      "params": ["blockNum"]
    },
    {
      "api": "database_api",
      "method": "get_ops_in_block",
      "params": ["blockNum", "onlyVirtual"]
    },
    {
      "api": "database_api",
      "method": "get_state",
      "params": ["path"]
    },
    {
      "api": "baiyujing_api",
      "method": "get_config"
    },
    {
      "api": "baiyujing_api",
      "method": "get_dynamic_global_properties"
    },
    {
      "api": "baiyujing_api",
      "method": "get_chain_properties"
    },
    {
      "api": "database_api",
      "method": "get_siming_schedule"
    },
    {
      "api": "database_api",
      "method": "get_hardfork_version"
    },
    {
      "api": "database_api",
      "method": "get_next_scheduled_hardfork"
    },
    {
      "api": "account_by_key_api",
      "method": "get_key_references",
      "params": ["key"]
    },
    {
      "api": "baiyujing_api",
      "method": "get_accounts",
      "params": ["names"]
    },
    {
      "api": "database_api",
      "method": "get_account_references",
      "params": ["accountId"]
    },
    {
      "api": "database_api",
      "method": "lookup_account_names",
      "params": ["accountNames"]
    },
    {
      "api": "database_api",
      "method": "lookup_accounts",
      "params": ["lowerBoundName", "limit"]
    },
    {
      "api": "baiyujing_api",
      "method": "get_account_count"
    },
    {
      "api": "database_api",
      "method": "get_account_history",
      "params": ["account", "from", "limit"]
    },
    {
      "api": "database_api",
      "method": "get_owner_history",
      "params": ["account"]
    },
    {
      "api": "database_api",
      "method": "get_recovery_request",
      "params": ["account"]
    },
    {
      "api": "database_api",
      "method": "get_withdraw_routes",
      "params": ["account", "withdrawRouteType"]
    },
    {
      "api": "database_api",
      "method": "get_transaction_hex",
      "params": ["trx"]
    },
    {
      "api": "database_api",
      "method": "get_transaction",
      "params": ["trxId"]
    },
    {
      "api": "baiyujing_api",
      "method": "get_transaction_results",
      "params": ["trxId"]  
    },
    {
      "api": "database_api",
      "method": "get_required_signatures",
      "params": ["trx", "availableKeys"]
    },
    {
      "api": "database_api",
      "method": "get_potential_signatures",
      "params": ["trx"]
    },
    {
      "api": "database_api",
      "method": "verify_authority",
      "params": ["trx"]
    },
    {
      "api": "database_api",
      "method": "verify_account_authority",
      "params": ["nameOrId", "signers"]
    },
    {
      "api": "database_api",
      "method": "get_simings",
      "params": ["simingIds"]
    },
    {
      "api": "database_api",
      "method": "get_siming_by_account",
      "params": ["accountName"]
    },
    {
      "api": "database_api",
      "method": "get_simings_by_adore",
      "params": ["from", "limit"]
    },
    {
      "api": "database_api",
      "method": "lookup_siming_accounts",
      "params": ["lowerBoundName", "limit"]
    },
    {
      "api": "database_api",
      "method": "get_siming_count"
    },
    {
      "api": "database_api",
      "method": "get_active_simings"
    },
    {
      "api": "database_api",
      "method": "get_reward_fund",
      "params": ["name"]
    },
    {
      "api": "database_api",
      "method": "get_qi_delegations",
      "params": ["account", "from", "limit"]
    },
    {
      "api": "login_api",
      "method": "login",
      "params": ["username", "password"]
    },
    {
      "api": "login_api",
      "method": "get_api_by_name",
      "params": ["database_api"]
    },
    {
      "api": "login_api",
      "method": "get_version"
    },
    {
      "api": "network_broadcast_api",
      "method": "broadcast_transaction",
      "params": ["trx"]
    },
    {
      "api": "network_broadcast_api",
      "method": "broadcast_transaction_with_callback",
      "params": ["confirmationCallback", "trx"]
    },
    {
      "api": "baiyujing_api",
      "method": "broadcast_transaction_synchronous",
      "params": ["trx"]
    },
    {
      "api": "network_broadcast_api",
      "method": "broadcast_block",
      "params": ["b"]
    },
    {
      "api": "network_broadcast_api",
      "method": "set_max_block_age",
      "params": ["maxBlockAge"]
    },
    {
      "api": "baiyujing_api",
      "method": "find_nfa",
      "params": ["nfaId"]  
    },
];
