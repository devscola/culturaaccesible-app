def retrieve_mode
  begin
    system_environment = ENV.fetch('SYSTEM_MODE')
  rescue
    system_environment = nil
  end
  return system_environment
end

def retrieve_port
  begin
    ionic_default_port = '8100'
  rescue
    ionic_default_port = '8100'
  end
  return ionic_default_port
end

def retrieve_travis
  File.exist?('travis.ci')
end
